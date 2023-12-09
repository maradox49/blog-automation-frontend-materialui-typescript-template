import { FC, ChangeEvent, useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,
    Card,
    Stack,
    Checkbox,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    OutlinedInput,
    styled,
    Dialog
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { DictionaryType } from 'src/models/dictionary';
import { LanguageName } from 'src/models/language';
import { DictionaryContext } from 'src/contexts/DictionaryContext';

const ImageWrapper = styled(Box)(
    ({ theme }) => `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
    `
)

const getFlagUrl = (language: LanguageName): string => {
    const map = {
        English: 'gb',
        German: 'de',
        Italian: 'it',
        Spanish: 'es',
        Holland: 'nl',
        French: 'fr'
    };

    return `/static/images/flag/${map[language]}.png`;
};

const FlagItem = (props) => {
    const { language } = props;

    return (
        <Stack direction={"row"} spacing={1} sx={{display: "flex", alignItems:"center"}}>
            <ImageWrapper>
                <img src={getFlagUrl(language)} />
            </ImageWrapper>
            <Box>{language}</Box>
        </Stack>
    )
}

FlagItem.propTypes = {
    language: PropTypes.string.isRequired
}

export default FlagItem;