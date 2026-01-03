import { AppLogos } from "@orderly.network/react-app";
import { withBasePath } from "../utils/base-path";
import { getRuntimeConfig, getRuntimeConfigBoolean } from "../utils/runtime-config";
import React from "react";

export const getSocialLinks = () => ({
    twitter: getRuntimeConfig('VITE_TWITTER_URL'),
    discord: getRuntimeConfig('VITE_DISCORD_URL'),
    telegram: getRuntimeConfig('VITE_TELEGRAM_URL'),
});

export const getAppIcons = (): AppLogos => ({
    main: getRuntimeConfigBoolean('VITE_HAS_PRIMARY_LOGO')
        ? {
            component: <img src={withBasePath(getRuntimeConfig('VITE_PRIMARY_LOGO_PATH') || "/logo.webp")} alt="logo" style={{ height: "42px" }} />
        }
        : { img: withBasePath("/shard-logo.svg") },
    secondary: {
        img: getRuntimeConfigBoolean('VITE_HAS_SECONDARY_LOGO')
            ? withBasePath(getRuntimeConfig('VITE_SECONDARY_LOGO_PATH') || "/logo-secondary.webp")
            : withBasePath("/shard-logo-secondary.svg"),
    },
});

export const getNavbarLogo = (isMobile: boolean) => {
    if (isMobile && getRuntimeConfigBoolean('VITE_HAS_SECONDARY_LOGO')) {
        return <img src={withBasePath(getRuntimeConfig('VITE_SECONDARY_LOGO_PATH') || "/logo-secondary.webp")} alt="logo" style={{ height: "32px" }} />;
    }

    if (getRuntimeConfigBoolean('VITE_HAS_PRIMARY_LOGO')) {
        return <img src={withBasePath(getRuntimeConfig('VITE_PRIMARY_LOGO_PATH') || "/logo.webp")} alt="logo" style={{ height: "32px", display: "block" }} />;
    }

    return <img src={withBasePath("/shard-logo.svg")} alt="logo" style={{ height: "24px", display: "block" }} />;
};
