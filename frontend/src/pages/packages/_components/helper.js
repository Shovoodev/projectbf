
// Critical JSON POST: throws on failure
export const parseMaybeJson = (raw) => {
    try {
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const readErrorMessage = async (res, fallback) => {
    const raw = await res.text().catch(() => "");
    const j = parseMaybeJson(raw);
    return j?.error || j?.message || raw || fallback;
};


export const postJsonOrThrow = async (url, body, opts = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
        credentials: opts.credentials ?? "include",
        body: JSON.stringify(body),
        ...opts,
    });

    if (!res.ok) {
        throw new Error(await readErrorMessage(res, "Request failed"));
    }

    // Some endpoints return empty body; don't break
    const raw = await res.text().catch(() => "");
    return { res, data: parseMaybeJson(raw), raw };
};

// Non-critical JSON POST: never throws (keeps flow alive)
export const postJsonSafe = async (url, body, opts = {}) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
            credentials: opts.credentials ?? "include",
            body: JSON.stringify(body),
            ...opts,
        });

        const raw = await res.text().catch(() => "");
        const data = parseMaybeJson(raw);

        if (!res.ok) {
            console.warn("Non-critical request failed:", url, res.status, data || raw);
            return { ok: false, status: res.status, data, raw };
        }
        return { ok: true, status: res.status, data, raw };
    } catch (err) {
        console.warn("Non-critical request error:", url, err);
        return { ok: false, status: 0, data: null, raw: String(err) };
    }
};

// Critical FormData POST: throws on failure
export const postFormOrThrow = async (url, formData, opts = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: opts.credentials ?? "include",
        body: formData,
        ...opts,
    });

    if (!res.ok) {
        throw new Error(await readErrorMessage(res, "Request failed"));
    }

    const raw = await res.text().catch(() => "");
    return { res, data: parseMaybeJson(raw), raw };
};

export const transformSelectionsForBackend = (selections) => {
    if (!selections) return null;

    const transformed = {};
    const keyMapping = {
        stationery: selections.stationery,
        bodyPreparation: selections.bodyPreparation,
        coffin: selections.coffin,
        flowers: selections.flowers,
        urn: selections.urn,
        collectionOfUrn: selections.collectionOfUrn,
        transferOption: selections.transferOption,
    };

    Object.entries(keyMapping).forEach(([key, value]) => {
        if (!value) return;
        transformed[key] = {
            value: value?.value ?? value,
            price: value?.price ?? "0",
        };
    });

    return Object.keys(transformed).length ? transformed : null;
};