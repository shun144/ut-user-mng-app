export class MessageBus {
  SendEmailChangedMessage(userId: number, newEmail: string) {
    console.log(
      `ユーザーID:${userId}さんへ新しいメールアドレス宛に送信しました`,
    );
  }
}
