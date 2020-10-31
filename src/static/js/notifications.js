const sucess = (msg) => {
    return toastr.success(msg, "NOTIFICATION")
}

const error = (msg) => {
    return toastr.error(msg, "NOTIFICATION")
}

const warning = (msg) => {
    return toastr.warning(msg, "NOTIFICATION")
}

var notifications = {
    sucess,
    error,
    warning
}