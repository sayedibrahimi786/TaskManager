module.exports = {
  BOARD_CREATE_BAD_REQUEST: "Bad request, Please provide boardName",
  BOARD_NOT_FOUND: "User Board not found",
  BOARD_NO_ACCCESS: "User does not have access to the board",
  BOARD_DELETE_NO_ACCESS: "User is not admin for this board",
  TASKLIST_CREATE_BAD_REQUEST:
    "Bad request, Please provide taskListName and BoardId",
  TASK_CREATE_BAD_REQUEST:
    "Bad request, Please provide header, BoardId and taskListId",
  TASKLIST_NOT_FOUND: "Task List Not found",
  TASKLIST_MISSING_BOARD: "Task List found but no boardId in the taskList",
  TASK_NOT_FOUND: "Task Not found",
  TASK_MISSING_TASKLIST: "Task found but no taskListId in the task",
  USER_CREATE_BAD_REQUEST:
    "Bad request, Please provide firstName, email and password",
  USER_CREATE_EXISTS: "User already exists!",
  USER_NOT_ACTIVE: "User is inactive",
  USER_INVALID_SEARCH_CRITERIA: "Please select valid search criteria",
  AUTH_BAD_REQUEST: "Please enter email and password",
  AUTH_INVALID_CREDENTIALS: "Invalid credentials",
  AUTH_NO_TOKEN: "No token, authorization denied",
  AUTH_TOKEN_NOT_VALID: "Token is not valid: ",
  AUTH_BOARD_NOT_DETERMINED:
    "Board is not determined, make sure to add boardId in request params or in request body",
  USER_NOT_FOUND: "User does not exists",
};
