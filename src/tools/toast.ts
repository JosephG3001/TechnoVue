import Vue from 'vue'

export function showErrorToast(error: string) {
    Vue.toasted.error(error);
}

export function showSuccessToast(msg: string) {
    Vue.toasted.success(msg);
}