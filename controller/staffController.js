const express = require("express");

const service = require("../service/staffService");

const StaffInfoDao = require("../pojo/StaffInfo");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const StaffInfoDaoInstance = new StaffInfoDao(req.body);
    const newStaff = await service.createStaff(StaffInfoDaoInstance);
    res.json(newStaff);
  } catch (error) {
    console.error("error while creating the staff", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchStaff = await service.getStaff();
    return res.json(fetchStaff);
  } catch (error) {
    console.error("error while fetching the staff", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/:staff_id", async (req, res) => {
  try {
    const { staff_id } = req.params;
    const fetchStaffById = await service.getStaffById(staff_id);
    return res.json(fetchStaffById);
  } catch (error) {
    console.error("error while fetching the staff", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:staff_id", async (req, res) => {
  try {
    const { staff_id } = req.params;
    const { first_name, username, password } = req.body;
    const modifyStaff = await service.updatestaff(
      staff_id,
      first_name,
      username,
      password
    );
    return res.json(modifyStaff);
  } catch (error) {
    console.error("error while updating the staff", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:staff_id", async (req, res) => {
  try {
    const { staff_id } = req.params;
    const deleteStaff = await service.removeStaff(staff_id);
    res.json(deleteStaff);
  } catch (error) {
    console.error("error while deleting the staff", error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
