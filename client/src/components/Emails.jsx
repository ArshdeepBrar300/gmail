import React, { useEffect, useState } from 'react'
import { API_URLS } from '../services/api.urls'
import useApi from '../hooks/useApi'
import { useOutletContext, useParams } from 'react-router-dom'
import { Checkbox, List, Box } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import EmailComponent from './EmailComponent'
import NoMails from './NoMails'
import { EMPTY_TABS } from '../constants/constant'

function Emails() {
    const [selectedEmails, setSelectedEmails] = useState([])
    const [refreshScreen, setRefreshScreen] = useState(false)
    const [isChecked, setChecked] = useState(false);

    const { openDrawer } = useOutletContext()
    const { type } = useParams()

    const getEmailsServices = useApi(API_URLS.getEmailFromType)
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin)
    const deleteEmailService = useApi(API_URLS.deleteEmail)

    useEffect(() => {

        getEmailsServices.call({}, type)

    }, [type, refreshScreen])


    const selectAllEmails = (e) => {
        setChecked(e.target.checked)
        if (e.target.checked) {
            const emails = getEmailsServices?.response?.map(email => (email._id))
            setSelectedEmails(emails)

        }
        else {
            setSelectedEmails([])

        }

    }

    const deleteSelectedEmails = () => {
        if (type === 'bin') {
            deleteEmailService.call(selectedEmails)


        } else {
            moveEmailsToBinService.call(selectedEmails)
        }
        setChecked(false)
        setRefreshScreen(prev => !prev)
        setSelectedEmails([])


    }
    return (
        <Box style={openDrawer ? { marginLeft: 250, width: 'calc(100% - 250px)' } : { width: '100%' }}>
            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox size='small' onChange={(e) => selectAllEmails(e)} checked={isChecked} />
                <DeleteOutline onClick={(e) => deleteSelectedEmails()} />
            </Box>
            <List>
                {
                    getEmailsServices?.response?.map(email => (
                        <EmailComponent email={email} key={email._id} selectedEmails={selectedEmails} setRefreshScreen={setRefreshScreen} setSelectedEmails={setSelectedEmails} />

                    ))
                }

            </List>
            {
                getEmailsServices?.response?.length == 0 && <NoMails message={EMPTY_TABS[type]} />
            }



        </Box>
    )
}

export default Emails