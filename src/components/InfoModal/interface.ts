export interface InfoModalInt<T> {
    openModal: boolean;
    modalInfo: T;
    onClose: () => void;
}
