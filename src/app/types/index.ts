export interface Club {
    id: string;
    name: string;
    tags: string[];
    heroImage: string;
    bar: string;
    time: string;
    dna: number;
    stats: {
      gender: number;
      crossMajor: number;
      senior: number;
    };
    summary: string;
    detail: string;
    letters: {
      success: string;
      pending: string;
      fail: string;
    };
  }
  
  export interface UserProfile {
    name: string;
    college: string;
    major: string;
    grade: string;
    birthDate: string;
    gender: string;
    hometown: string;
    studentId: string;
  }
  
  export interface ApplicationRecord {
    club: Club;
    status: string;
    result: "success" | "pending" | "fail";
    msg: string;
    read: boolean;
  }
  
  export interface Preferences {
    social: number;
    energy: number;
    time: number;
  }