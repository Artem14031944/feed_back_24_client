import { format } from "date-fns";

const checkTimeUpdate = (createdAt: string, updatedAt: string, dateFormat: string) => {
    if (Number(new Date(createdAt)) !== Number( new Date(updatedAt))) return format(updatedAt, dateFormat);
    else return 'Пока нет ответили'
};

export {
    checkTimeUpdate
};