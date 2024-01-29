export interface Codec {
    label: String,
    value: String
}

export const Codecs: Array<Codec> = [
    { label: 'Spotify Normal', value:'normal' },
    { label: 'Spotify Very High', value:'veryhigh' },
    { label: 'Apple AAC 256kb/s', value:'aac' },
    { label: 'MQA', value:'mqa' },
    { label: 'CD Quality FLAC', value:'16flac' },
    { label: 'High Res FLAC', value:'24flac' }
];