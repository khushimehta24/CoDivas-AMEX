import { React, useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  TableHead,
  Table,
  TableBody,
  Avatar
} from '@mui/material'
import { Icon } from '@iconify/react'
import { getEntities } from '../../services/userServices'
import Loader from '../loader/Loading'

const NumOfCards = () => {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await getEntities().then((res) => {
        console.log('data entities')
        console.log(res.data.data)
        setEntities(res.data.data)
      })
    }
    fetchData()
  }, [])
  return (
    <>
      {entities.merchants ? (
        <>
          <Grid container spacing={5} sx={{ padding: '0px 25px' }}>
            <Grid item xs={4}>
              <Card sx={{ minWidth: 275, backgroundColor: '#1d1d1d' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={3}>
                    <Icon
                      icon="ic:twotone-emoji-people"
                      color={'#fff'}
                      width="50"
                      height="50"
                      style={{ padding: '30px' }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="h6"
                      color="#fff"
                      style={{
                        borderLeft: '0.1em solid white',
                        padding: '0.5em',
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      Number of Registered Merchants
                    </Typography>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant="h6"
                        color="#fff"
                        style={{
                          borderLeft: '0.1em solid white',
                          padding: '0.5em',
                          paddingLeft: '3.5em',
                          display: 'flex',
                          justifyContent: 'center',
                          fontFamily: 'Poppins',
                        }}
                        align="center"
                      >
                        <b>{entities?.merchants.length}</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ minWidth: 275, backgroundColor: '#1d1d1d' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={3}>
                    <Icon
                      icon="mdi:bank-check"
                      color={'#fff'}
                      width="50"
                      height="50"
                      style={{ padding: '30px' }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="h6"
                      color="#fff"
                      style={{
                        borderLeft: '0.1em solid white',
                        padding: '0.5em',
                        display: 'flex',
                        justifyContent: 'center',
                        // height: '100%',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      Number of Registered Banks
                    </Typography>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant="h6"
                        color="#fff"
                        style={{
                          borderLeft: '0.1em solid white',
                          padding: '0.5em',
                          paddingLeft: '3.5em',
                          display: 'flex',
                          justifyContent: 'center',
                          fontFamily: 'Poppins',
                        }}
                        align="center"
                      >
                        <b>{entities?.bankUsers.length}</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ minWidth: 275, backgroundColor: '#1d1d1d' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={3}>
                    <Icon
                      icon="mdi:account-group-outline"
                      color={'#fff'}
                      width="50"
                      height="50"
                      style={{ padding: '30px' }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="h6"
                      color="#fff"
                      style={{
                        borderLeft: '0.1em solid white',
                        padding: '0.5em',
                        display: 'flex',
                        justifyContent: 'center',
                        // height: '100%',
                        fontFamily: 'Poppins',
                      }}
                      align="center"
                    >
                      Number of Registered Organisations
                    </Typography>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant="h6"
                        color="#fff"
                        style={{
                          borderLeft: '0.1em solid white',
                          padding: '0.5em',
                          paddingLeft: '3.5em',
                          display: 'flex',
                          justifyContent: 'center',
                          fontFamily: 'Poppins',
                        }}
                        align="center"
                      >
                        <b>{entities?.organisationDetails.length}</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="#fff"
                style={{
                  borderLeft: '0.1em solid white',
                  padding: '0.5em',
                  fontFamily: 'Poppins',
                }}
              >
                Registered Merchant Details
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>ID</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>
                        Business Name
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>
                        GST No.
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>UID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#1d1d1d' }}>
                    {entities.merchants.slice(0, 7).map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row._id}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.businessName}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.gstNo}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.uid}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="#fff"
                style={{
                  borderLeft: '0.1em solid white',
                  padding: '0.5em',
                  fontFamily: 'Poppins',
                }}
              >
                Registered Organization Details
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontFamily: 'Poppins' }}></TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>
                        Organization Name
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>
                        Organization ID
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#1d1d1d' }}>
                    {entities.organisationDetails.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={row.orgLogo}
                            sx={{
                              width: 56,
                              height: 56,
                              backgroundColor: 'white',
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.orgName}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.orgId}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="#fff"
                style={{
                  borderLeft: '0.1em solid white',
                  padding: '0.5em',
                  fontFamily: 'Poppins',
                }}
              >
                Registered Bank Details
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontFamily: 'Poppins' }}></TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>Bank Name</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>
                        PAN No.
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>Registered Contact No.</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>Vouchers Issued</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins' }}>ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#1d1d1d' }}>
                    {entities.bankUsers.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={row.bank.bankLogo}
                            sx={{
                              width: 56,
                              height: 56,
                              backgroundColor: 'white',
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.user.name}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.user.pan}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.user.phone}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.bank.vouchersIssued.length}
                        </TableCell>
                        <TableCell
                          sx={{ color: '#fff', fontFamily: 'Poppins' }}
                        >
                          {row.bank._id}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default NumOfCards
