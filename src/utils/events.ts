import { getCollection, type CollectionEntry } from 'astro:content';
import { siteConfig } from '../config/site';

export type EventEntry = CollectionEntry<'events'>;
export type EventStatus = EventEntry['data']['status'];

/** 開催ステータスごとの表示ラベルとスタイル定義 */
export const STATUS_META: Record<
  EventStatus,
  { label: string; badgeClass: string; description: string }
> = {
  upcoming: {
    label: '開催準備中',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    description: '次回の開催に向けて企画・準備を進めています',
  },
  open: {
    label: '開催予定・案内公開中',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: '参加案内を公開中です！ぜひ遊びに来てください',
  },
  finished: {
    label: '開催終了',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'たくさんのご参加ありがとうございました！',
  },
};

/**
 * 全年度のイベントデータを降順（新しい年度順）で取得します。
 */
export async function getAllEventsSorted(): Promise<EventEntry[]> {
  const entries = await getCollection('events');
  return entries.sort((a, b) => b.data.year - a.data.year);
}

/**
 * site.ts の latestYear に一致するメインイベントを取得します。
 * 見つからない場合は最新年度のデータをフォールバックとして返します。
 */
export async function getFeaturedEvent(): Promise<EventEntry> {
  const sorted = await getAllEventsSorted();
  const matched = sorted.find((entry) => entry.data.year === siteConfig.latestYear);
  const featured = matched ?? sorted[0];
  if (!featured) {
    throw new Error('src/content/events/ にイベントデータが見つかりません。');
  }
  return featured;
}

/**
 * Google検索向け Event タイプ構造化データ（JSON-LD）を生成します。
 */
export function buildEventJsonLd(event: EventEntry, pageUrl: string): Record<string, unknown> {
  const { data } = event;
  const eventStatusMap: Record<EventStatus, string> = {
    upcoming: 'https://schema.org/EventScheduled',
    open: 'https://schema.org/EventScheduled',
    finished: 'https://schema.org/EventScheduled',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.title,
    description: data.summary,
    ...(data.startDateIso ? { startDate: data.startDateIso } : {}),
    ...(data.endDateIso ? { endDate: data.endDateIso } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: eventStatusMap[data.status],
    location: {
      '@type': 'Place',
      name: siteConfig.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '錦町3-2-26',
        addressLocality: '立川市',
        addressRegion: '東京都',
        postalCode: '190-0022',
        addressCountry: 'JP',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: siteConfig.organizerName,
      ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    },
    isAccessibleForFree: data.fee.includes('無料'),
    url: pageUrl,
  };
}
