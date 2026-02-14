import { useMemo, useState } from "react";

/** ✅ Export validators so pages can import them */
export const validators = {
    required: (label = "This field") => (value) => {
        const v = value ?? "";
        if (typeof v === "string" && v.trim() === "") return `${label} is required`;
        if (v === null || v === undefined) return `${label} is required`;
        return null;
    },

    email: (label = "Email") => (value) => {
        if (!value) return null;
        const s = String(value).trim();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
        return ok ? null : `${label} is not valid`;
    },

    phoneAU: (label = "Phone") => (value) => {
        if (!value) return null;
        const s = String(value).trim();
        if (!/^\d+$/.test(s)) return `${label} must be numbers only (example: 0412345678)`;
        if (s.length < 8 || s.length > 12)
            return `${label} looks too short/long (example: 0412345678)`;
        return null;
    },

    postcodeAU: (label = "Postcode") => (value) => {
        if (!value) return null;
        const s = String(value).trim();
        return /^\d{4}$/.test(s) ? null : `${label} must be 4 digits (example: 2000)`;
    },
};

const validateField = (field, value, values, rules) => {
    const fieldRules = rules[field] || [];
    for (const rule of fieldRules) {
        const msg = rule(value, values);
        if (msg) return msg;
    }
    return null;
};

const validateAll = (values, rules) => {
    const errors = {};
    Object.keys(rules).forEach((field) => {
        const msg = validateField(field, values[field], values, rules);
        if (msg) errors[field] = msg;
    });
    return errors;
};

export const useFormValidator = ({
    rules = {},
    initialValues = {},
    onChangeField,
    onValidSubmit,
    scrollToError = true,
} = {}) => {
    const stableRules = useMemo(() => rules, [rules]);

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const setValue = (name, value) => {
        setValues((prev) => {
            const next = { ...prev, [name]: value };

            if (touched[name]) {
                const msg = validateField(name, value, next, stableRules);
                setErrors((prevErr) => {
                    const copy = { ...prevErr };
                    if (msg) copy[name] = msg;
                    else delete copy[name];
                    return copy;
                });
            }

            if (typeof onChangeField === "function") {
                onChangeField(name, value, next);
            }

            return next;
        });
    };

    const markTouched = (name) => {
        setTouched((prev) => ({ ...prev, [name]: true }));

        setValues((prev) => {
            const msg = validateField(name, prev[name], prev, stableRules);
            setErrors((prevErr) => {
                const copy = { ...prevErr };
                if (msg) copy[name] = msg;
                else delete copy[name];
                return copy;
            });
            return prev;
        });
    };

    const register = (name, options = {}) => {
        const { transform } = options;

        return {
            name,
            value: values[name] ?? "",
            onChange: (e) => {
                const raw = e?.target?.value;
                const nextVal = typeof transform === "function" ? transform(raw) : raw;
                setValue(name, nextVal);
            },
            onBlur: () => markTouched(name),
        };
    };

    const handleSubmit = async (e) => {
        e?.preventDefault?.();

        const allErrors = validateAll(values, stableRules);
        setErrors(allErrors);

        // mark all as touched
        const touchedAll = {};
        Object.keys(stableRules).forEach((k) => (touchedAll[k] = true));
        setTouched(touchedAll);

        if (Object.keys(allErrors).length > 0) {
            if (scrollToError) {
                const firstKey = Object.keys(allErrors)[0];
                const el = document.querySelector(`[name="${firstKey}"]`);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    el.focus?.();
                }
            }
            return;
        }

        return onValidSubmit?.(values);
    };

    const errorFor = (name) => errors[name] || "";
    const hasError = (name) => Boolean(errors[name]);

    return {
        values,
        setValue,
        errors,
        errorFor,
        hasError,
        touched,
        register,
        handleSubmit,
        setErrors,
        setValues,
    };
};
