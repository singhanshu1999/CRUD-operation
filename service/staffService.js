const db = require("../connector/staffDb");

async function createStaff(staffInfoDaoInstance) {
  const insertStaffList = await db.staffCreateQuery(staffInfoDaoInstance);
  return insertStaffList;
}

async function getStaff() {
  const getStaffList = await db.staffGetQuery();
  return getStaffList;
}

async function getStaffById(staffInfoInstance) {
  const getStaffListByIdStaff = await db.staffGetByIdQuery(staffInfoInstance);
  return getStaffListByIdStaff;
}

async function getStaffByCityName(staffInfoInstance) {
  const getListByCityStaff = await db.staffGetByCityQuery(staffInfoInstance);
  return getListByCityStaff;
}

async function updatestaff(staffInfoInstance, staffInfoDaoInstance) {
  const updateStaffList = await db.staffUpdateQuery(
    staffInfoInstance,
    staffInfoDaoInstance
  );
  return updateStaffList;
}

async function removeStaff(staffInfoInstance) {
  const removeStaffList = await db.staffRemoveQuery(staffInfoInstance);
  return removeStaffList;
}

module.exports = {
  createStaff,
  getStaff,
  getStaffById,
  getStaffByCityName,
  updatestaff,
  removeStaff,
};
