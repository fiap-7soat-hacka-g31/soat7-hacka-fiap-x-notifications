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
    downloadSignedUrl?: string,
    rejectionReason?: string,
  ): Promise<void> {
    const params = new EmailParams()
      .setFrom(this.getSender())
      .setTo([this.getRecipient(customerName, destinationEmail)])
      .setSubject(this.getSubject(status))
      .setHtml(this.getTemplate(status))
      .setPersonalization([
        {
          email: destinationEmail,
          data: {
            customerName,
            videoId,
            filename,
            downloadSignedUrl,
            rejectionReason: this.getRejectionReason(rejectionReason),
          },
        },
      ]);

    await this.client.email.send(params);
  }

  private getSubject(status: string) {
    const statusText = status === 'PROCESSED' ? 'Sucesso' : 'Falha';
    return `Fiap X - Notificação de Processamento - ${statusText}`;
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

  private getRejectionReason(rejectionReason: string) {
    const knownReasons = {
      'Video file could not be processed': 'E0001 - Não foi possível processar',
      'Invalid file format': 'E0002 - Formato de vídeo inválido',
      'File is too large to handle': 'E0003 - Arquivo muito grande',
    };
    const fallback = 'E0000 - Não foi possível processar';

    const reason = knownReasons[rejectionReason] ?? fallback;
    return reason;
  }
}
