export type StaffRole =
  | 'Owner'
  | 'Manager'
  | 'Senior Stylist'
  | 'Stylist'
  | 'Color Specialist'
  | 'Aesthetician'
  | 'Therapist'
  | 'Makeup Artist'
  | 'Nail Artist'
  | 'Receptionist';

export type StaffStatus = 'Active' | 'Inactive' | 'On Leave';

export type StaffAvailability =
  | 'Available'
  | 'Busy'
  | 'On Break'
  | 'On Leave'
  | 'Offline';

export type LeaveType = 'Annual Leave' | 'Sick Leave' | 'Personal Leave' | 'Unpaid Leave';
export type LeaveStatus = 'Approved' | 'Pending' | 'Declined';

export interface StaffWorkingDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  enabled: boolean;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
}

export interface StaffLeaveRecord {
  id: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
}

export interface StaffScheduleSlot {
  id: string;
  time: string;
  clientName: string;
  serviceName: string;
  duration: string;
  status: 'Confirmed' | 'In Progress' | 'Completed' | 'Break';
}

export interface StaffAppointmentHistoryItem {
  id: string;
  date: string;
  customerName: string;
  customerAvatar?: string;
  serviceName: string;
  time: string;
  status: 'Completed' | 'Confirmed' | 'Cancelled' | 'No-show';
  revenue: number;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: StaffRole;
  bio?: string;
  experienceYears: number;
  joinedDate: string;
  status: StaffStatus;
  availability: StaffAvailability;
  assignedServices: string[];
  workingHours: StaffWorkingDay[];
  todayAppointmentsCount: number;
  rating: number;
  reviewCount: number;
  leaveRecords: StaffLeaveRecord[];
  todaySchedule: StaffScheduleSlot[];
  appointmentHistory: StaffAppointmentHistoryItem[];
}

export interface StaffStatsData {
  totalStaff: number;
  activeStaff: number;
  onLeave: number;
  availableToday: number;
}
