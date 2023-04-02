import db from '../../data/db.json'
const getMails = () => {
    return db.mails
}
export { getMails }