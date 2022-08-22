"use strict";
const crypto = require("crypto")

const utils = require("@strapi/utils");
const { santize } = utils;

module.exports = {
    resetPasswordToken: async ctx => {
        const {
            identifier,
            jwt
        } = ctx.request.body;

        if (!identifier || !jwt) {
        return ctx.throw(400, "All identifiers not provided");
        }

        let user = await strapi
            .query("plugin::users-permissions.user")
            .findOne({where: { id: identifier }});
        
        console.log("user", user)

        if(!user){
            return ctx.throw(400, "This user does not exist")
        }

        // validate "blocked" user field
        // !blocked && continue...

        const validToken = await strapi.plugins[
                'users-permissions'
            ].services.jwt.verify(jwt)


        if (!validToken) {
            return ctx.throw(401, "Your current token is invalid");
        } else {

            // Generate new reset password token
            const resetToken = crypto.randomBytes(64).toString('hex')

            user = await strapi.query("plugin::users-permissions.user").update({
                where: { id: identifier },
                data: { resetPasswordToken: resetToken },
            });

            
            ctx.send({
                user: await utils.sanitize.contentAPI.output(
                    user,
                    strapi.getModel("plugin::users-permissions.user")
                )
            });

        }       
    }
}