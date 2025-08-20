export const outerLayoutStyles = {
  backgroundColor: 'var(--bg)',
  color: 'var(--fg)',
}

export const blockLayoutStyles = ({
  border,
}: {
  border?: 'all' | 'bottom' | 'right' | 'left' | 'top'
}) => ({
  backgroundColor: 'var(--surface)',
  ...(border === 'all' && { border: '1px solid var(--border)' }),
  ...(border === 'right' && { borderRight: '1px solid var(--border)' }),
  ...(border === 'left' && { borderLeft: '1px solid var(--border)' }),
  ...(border === 'top' && { borderTop: '1px solid var(--border)' }),
  ...(border === 'bottom' && { borderBottom: '1px solid var(--border)' }),
})
