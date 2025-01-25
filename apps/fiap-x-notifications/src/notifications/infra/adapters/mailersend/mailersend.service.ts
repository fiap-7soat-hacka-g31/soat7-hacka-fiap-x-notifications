import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { MailerService } from '../../../application/abstractions/mailer.service';
import { FailureMailTemplate, SuccessMailTemplate } from './templates';

@Injectable()
export class MailerSendService implements MailerService {
  constructor(
    private readonly client: MailerSend,
    private readonly config: ConfigService,
  ) {}

  async sendProcessingNotification(
    customerName: string,
    destinationEmail: string,
    status: string,
    videoId: string,
    filename: string,
  ): Promise<void> {
    const params = new EmailParams()
      .setFrom(this.getSender())
      .setTo([this.getRecipient(customerName, destinationEmail)])
      .setSubject('Video Processing Notification')
      .setHtml(this.getTemplate(status))
      .setPersonalization([
        { email: destinationEmail, data: { customerName, videoId, filename } },
      ]);

    await this.client.email.send(params);
  }

  private getSender() {
    const domain = this.config.getOrThrow('PROVIDER_MAILER_SEND_DOMAIN');
    return new Sender(`contact@${domain}`, 'Fiap X');
  }

  private getRecipient(customerName: string, email: string) {
    return new Recipient(email, customerName);
  }

  private getTemplate(status: string) {
    return status === 'PROCESSED' ? SuccessMailTemplate : FailureMailTemplate;
  }
}
