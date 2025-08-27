export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const headerHeight = 64; // Adjust for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
