tailwind.config = {
    theme: {
        extend: {
            colors: {
                land: {
                    bg: '#F7F4EE',           /* 大地文化感手感暖米白 */
                    card: '#EFEBE4',         /* 微質感沉穩紙感卡片 */
                    dark: '#1A3029',         /* 深沉墨綠 */
                    slate: '#27443B',        /* 典雅綠竹墨色 */
                    gold: '#B58E52',         /* 人文古銅金 */
                    goldhover: '#9E783E',
                    terracotta: '#A65D47',   /* 陶土微紅暖色 */
                    text: '#2C2B29',         /* 沉穩墨黑文字 */
                    muted: '#6B6861'         /* 人文灰 */
                }
            },
            fontFamily: {
                serif: ['"Noto Serif TC"', '"Playfair Display"', 'serif'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif']
            },
            boxShadow: {
                'land': '0 4px 20px -2px rgba(26, 48, 41, 0.05), 0 2px 6px -1px rgba(26, 48, 41, 0.03)',
                'land-hover': '0 12px 28px -4px rgba(26, 48, 41, 0.1), 0 4px 12px -2px rgba(181, 142, 82, 0.15)',
            }
        }
    }
}