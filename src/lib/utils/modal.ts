export const closeModal = (modalId: string) => (document.getElementById(modalId).checked = false);
export const openModal = (modalId: string) => (document.getElementById(modalId).checked = true);
