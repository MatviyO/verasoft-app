export type Order = {
  id: string;
  date: string;
  time: string;
  sentAt: number;
  subjectTitle: string;
  subjectEmail: string;
  communicationType: string;
  orderNumber: string;
  status: 'sent' | 'error';
};
