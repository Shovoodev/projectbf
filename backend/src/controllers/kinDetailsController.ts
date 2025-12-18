import express from "express";

export const registerUserGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { userId } = req.params;

    const { name } = req.body;
    //   if (!name) {
    //     return res.status(400);
    //   }
    //   const group = await createGroup({
    //     name,
    //     owner_id: userId,
    //   });
    //   console.log({ group });

    //   const inviteToken = authentication(random(), random());
    //   const member = await createMember({
    //     userId: userId,
    //     groupId: group._id,
    //     role: "admin",
    //     inviteToken: inviteToken,
    //     isActive: true,
    //   });
    //   console.log({ member });

    //   return res.status(200).json({ ...group, member });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
