/**
 * サイト共通設定ファイル
 * 団体情報・連絡先・会場・SNS・トップページに表示する最新開催年度などを一元管理します。
 */

export interface SocialLink {
  /** SNS名（表示用ラベル） */
  label: string;
  /** アイコン識別子 */
  type: 'instagram' | 'x' | 'facebook' | 'youtube';
  /** リンクURL */
  url: string;
}

export interface VenueConfig {
  /** 会場名 */
  name: string;
  /** 郵便番号 */
  postalCode: string;
  /** 住所 */
  address: string;
  /** 施設公式サイトURL */
  officialUrl: string;
  /** 交通アクセス案内 */
  access: string[];
  /** Googleマップ埋め込み用URL */
  mapEmbedUrl: string;
  /** Googleマップ外部リンクURL */
  mapExternalUrl: string;
}

export interface SiteConfig {
  /** イベント・サイト名 */
  siteName: string;
  /** 読み仮名・サブタイトル */
  siteSubtitle: string;
  /** 運営団体名 */
  organizerName: string;
  /** お問い合わせメールアドレス */
  contactEmail: string;
  /** サイトの基本説明文（SEO・OGPデフォルト値） */
  defaultDescription: string;
  /** トップページ（/）に表示するメイン開催年度 */
  latestYear: number;
  /** 会場情報 */
  venue: VenueConfig;
  /** SNSリンク一覧 */
  socialLinks: SocialLink[];
}

export const siteConfig: SiteConfig = {
  siteName: '〇〇わんぱーく',
  siteSubtitle: '立川市子ども未来センター 体験型あそびイベント',
  organizerName: '〇〇わんぱーく実行委員会',
  // 公開リポジトリにメールアドレスを直書きしないため、環境変数 PUBLIC_CONTACT_EMAIL から読み込みます
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? '',
  defaultDescription:
    '立川市子ども未来センターで毎年開催！墨・水・煙・音・はな・紙飛行機など、普段できない「まみれる」体験を子どもたちに届ける参加無料の体験型イベント「〇〇わんぱーく」公式Webサイト。',
  // トップページに表示する開催年度（2027年公開時はここを 2027 に変更してください）
  latestYear: 2026,
  venue: {
    name: '立川市子ども未来センター',
    postalCode: '〒190-0022',
    address: '東京都立川市錦町3-2-26',
    officialUrl: 'https://t-mirai.com/',
    access: [
      'JR中央線・南武線・青梅線「立川駅」南口より徒歩約13分',
      'JR南武線「西国立駅」より徒歩約7分',
      '多摩都市モノレール「立川南駅」より徒歩約12分',
      '※駐車台数に限りがあるため、公共交通機関でのご来場をおすすめします。',
    ],
    mapEmbedUrl:
      'https://maps.google.com/maps?q=%E7%AB%8B%E5%B7%9D%E5%B8%82%E5%AD%90%E3%81%A9%E3%82%82%E6%9C%AA%E6%9D%A5%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E7%AB%8B%E5%B7%9D%E5%B8%82%E9%8C%A6%E7%94%BA3-2-26&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapExternalUrl:
      'https://www.google.com/maps/search/?api=1&query=%E7%AB%8B%E5%B7%9D%E5%B8%82%E5%AD%90%E3%81%A9%E3%82%82%E6%9C%AA%E6%9D%A5%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC+%E6%9D%B1%E4%BA%AC%E9%83%BD%E7%AB%8B%E5%B7%9D%E5%B8%82%E9%8C%A6%E7%94%BA3-2-26',
  },
  socialLinks: [
    {
      label: 'Instagram',
      type: 'instagram',
      url: 'https://www.instagram.com/',
    },
    {
      label: 'X (旧Twitter)',
      type: 'x',
      url: 'https://x.com/',
    },
    {
      label: 'Facebook',
      type: 'facebook',
      url: 'https://www.facebook.com/',
    },
  ],
};
