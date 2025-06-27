import './globals.css'

export const metadata = {
  title: '東京社交組局App',
  description: '新卒上班族专属社交平台',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
