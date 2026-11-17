import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 年度別イベントコレクションのスキーマ定義
 * src/content/events/ 配下の Markdown ファイル（例: 2026.md, 2027.md）を読み込みます。
 */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      /** 開催年（西暦・数値） */
      year: z.number().int(),

      /** イベントタイトル（例: 〇〇わんぱーく2026） */
      title: z.string(),

      /**
       * 開催ステータス
       * - upcoming: 開催準備中・近日公開（ティザー表示・案内メール導線）
       * - open: 開催予定・案内公開中（参加案内・申込導線を表示）
       * - finished: 開催終了（開催レポート・写真ギャラリー導線を表示）
       */
      status: z.enum(['upcoming', 'open', 'finished']),

      /** 開催日（表示用文字列、例: 2026年5月17日（日）） */
      date: z.string(),

      /** 構造化データ（JSON-LD）用の開始日時（ISO 8601形式、未定時は省略可） */
      startDateIso: z.string().optional(),

      /** 構造化データ（JSON-LD）用の終了日時（ISO 8601形式、未定時は省略可） */
      endDateIso: z.string().optional(),

      /** 受付・開催時間（例: 10:00〜14:30） */
      time: z.string(),

      /** 参加費（例: 無料） */
      fee: z.string(),

      /** 対象年齢の目安（例: 2歳以上〜小学生・ご家族） */
      target: z.string().default('子どもから大人まで（未就学児は保護者同伴）'),

      /** メインキャッチコピー */
      catchphrase: z.string(),

      /** テーマ素材キーワード配列（例: ['墨', 'はな', '煙', ...]） */
      themeKeywords: z.array(z.string()),

      /** イベント概要テキスト */
      summary: z.string(),

      /** 事前申込や公式案内フォームのURL（必要な回のみ指定） */
      applicationUrl: z.url().optional(),

      /** 来場者数や実施ハイライトなどの実績メモ（終了後レポート用） */
      highlights: z.array(z.string()).default([]),

      /** 参加団体・プログラム一覧 */
      programs: z
        .array(
          z.object({
            /** 参加団体名 */
            organization: z.string(),
            /** プログラム名 */
            name: z.string(),
            /** 実施エリア区分 */
            area: z.enum(['屋内', '芝生広場']),
            /** 対象年齢 */
            targetAge: z.string(),
            /** プログラム概要 */
            description: z.string(),
            /** プログラム画像（src/assets/events/[year]/ からの相対パス） */
            image: image().optional(),
          })
        )
        .default([]),

      /** よくある質問（Q&A） */
      faqs: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .default([]),

      /** 開催写真ギャラリー */
      gallery: z
        .array(
          z.object({
            /** 写真画像（src/assets/events/[year]/ からの相対パス） */
            image: image(),
            /** 写真のキャプション */
            caption: z.string(),
          })
        )
        .default([]),
    }),
});

export const collections = { events };
