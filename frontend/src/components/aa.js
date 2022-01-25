<Paper>
  <Card
    sx={{
      minWidth: 0,
      bgcolor: (theme) => (theme.palette.mode === "dark" ? "#272727" : "#fff"),
      boxShadow: (theme) =>
        theme.palette.mode === "dark" ? "unset" : "0 8px 16px 0 #BDC9D7",
    }}
  >
    <FlexRow
      alignItems="center"
      p={2}
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2f3c50" : "#fff",
      }}
    >
      <Item grow mr={1}>
        <LanguageSelector />
      </Item>
    </FlexRow>
    <CardContent>
      {!userId && !labId && <p> Error !! Please Refresh the Page</p>}
      {userId && labId && <TextEditor documentId={`${userId}+${labId}`} />}
    </CardContent>
  </Card>
</Paper>;
