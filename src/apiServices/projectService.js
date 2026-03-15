import axios from "axios";

const BASE_URL = "https://api.mycampushut.com/campushutProject";
 
export async function getAllDepartments() {
  try {
    const res = await axios.get(`${BASE_URL}/project/getAllDepartment`);
    return res.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw new Error("Failed to fetch departments");
  }
}

export async function getProjectsByDepartment(departmentName, page = 1) {
  console.log(
    "Fetching projects for department:",
    departmentName,
    "Page:",
    page,
  );
  try {
    const res = await axios.post(
      `${BASE_URL}/project/getListOfProjectByDepartment`,
      null,
      {
        params: {
          departmentName,
          page,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching projects by department:", error);
    throw new Error("Failed to fetch projects for this department");
  }
}

export async function getProjectDetailByTitle(projectTitle) {
  try {
    const res = await axios.get(`${BASE_URL}/project/getProjectDetailByTitle`, {
      params: {
        projectTitle,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw new Error("Failed to fetch project details");
  }
}