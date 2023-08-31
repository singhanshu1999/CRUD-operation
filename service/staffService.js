const db = require("../connector/staffDb");

async function createStaff(StaffInfoDaoInstance) {
  const insertedStaff = await db.staffCreateQuery(StaffInfoDaoInstance);
  return insertedStaff;
}

async function getStaff() {
  const gettedStaff = await db.staffGetQuery();
  return gettedStaff;
}

async function getStaffById(staff_id) {
  const gettedByIdStaff = await db.staffGetByIdQuery(staff_id);
  return gettedByIdStaff;
}

async function updatestaff(staff_id, first_name, username, password) {
  const updatedStaff = await db.staffUpdateQuery(
    staff_id,
    first_name,
    username,
    password
  );
  return updatedStaff;
}

async function removeStaff(staff_id) {
  const removedStaff = await db.staffRemoveQuery(staff_id);
  return removedStaff;
}

module.exports = {
  createStaff,
  getStaff,
  getStaffById,
  updatestaff,
  removeStaff,
};
