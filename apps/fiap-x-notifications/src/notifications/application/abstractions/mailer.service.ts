export abstract class MailerService {
  abstract sendProcessingNotification(
    customerName: string,
    destinationEmail: string,
    status: string,
    videoId: string,
    filename: string,
    downloadSignedUrl?: string,
    rejectionReason?: string,
  ): Promise<void>;
}
