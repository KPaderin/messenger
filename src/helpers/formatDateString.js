const MONTH_LOCAL = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
]
const extendToTwoDigits = function(number) { return ("0" + number).slice(-2) }

export const formatDateString = function(rawDate) {
    const today = new Date()
    if (!rawDate)
        return `Сегодня ${extendToTwoDigits(today.getHours())}:${extendToTwoDigits(today.getMinutes())}`
    const createdAt = new Date(rawDate)
    if (today.getFullYear() === createdAt.getFullYear()
        && today.getMonth() === createdAt.getMonth()
        && today.getDate() === createdAt.getDate()) {
        return `Сегодня ${extendToTwoDigits(createdAt.getHours())}:${extendToTwoDigits(createdAt.getMinutes())}`
    } else {
        return `${extendToTwoDigits(createdAt.getDate())} 
        ${MONTH_LOCAL[createdAt.getMonth()]} 
        ${extendToTwoDigits(createdAt.getHours())}:${extendToTwoDigits(createdAt.getMinutes())}`
    }
}
