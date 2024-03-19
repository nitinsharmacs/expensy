export const boxStyle = (open: boolean) => ({
  position: 'sticky',
  display: open ? 'flex' : 'none',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0.5em',
  top: '56px',
  backgroundColor: 'white',
  zIndex: 1,
});
