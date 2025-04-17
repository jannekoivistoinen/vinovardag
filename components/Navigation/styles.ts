// Shared styles (used in both desktop and mobile)
export const linkStyles = "text-[#141414] text-base font-medium transition";
export const linkStylesActive = "text-brand-dark";
export const descriptionStyles = "text-sm text-gray-500";

// Desktop styles
export const desktopLinkStyles = `${linkStyles} py-6 px-[1vw] hover:opacity-50`;
export const desktopPopoverTriggerStyles = "flex items-center gap-1";
export const desktopPopoverContentStyles = "w-full p-0 pb-2 bg-white";
export const desktopPopoverContentWideStyles = "w-full p-0 bg-white";
export const desktopPopoverLinkStyles =
  "flex items-center gap-5 py-3 px-6 hover:bg-[#F1F1F0] rounded-md transition-colors";
export const desktopPopoverLinkActiveStyles = "bg-[#F1F1F0]";
export const desktopPopoverLinkTitleStyles =
  "text-[15px] font-semibold text-[#141414]";
export const desktopPopoverLinkDescStyles = descriptionStyles;

// Mobile styles
export const mobileLinkStyles = `${linkStyles} block text-lg hover:text-brand-dark py-0.5`;
export const mobileSubmenuLinkStyles =
  "block text-base text-gray-600 hover:bg-[#F1F1F0] rounded-md transition-colors py-3 px-4";
export const mobileLinkStylesActive = "";
export const mobileSubmenuLinkStylesActive = "bg-[#F1F1F0]";
export const mobileDescriptionStyles = descriptionStyles;
