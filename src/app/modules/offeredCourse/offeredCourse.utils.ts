import { TDays, TSchedule } from "./offeredCourse.interface"




export const hasTimeConflict = (assignSchedules:TSchedule[],newSchedules:TSchedule) => {
  for (const schedule of assignSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedules.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
       return true
    }
  }

  return false
}