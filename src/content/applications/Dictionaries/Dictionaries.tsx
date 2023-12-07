import { Card } from '@mui/material';
import RecentOrdersTable from './DictionariesTable';
import { subDays } from 'date-fns';
import { DictionaryType } from 'src/models/dictionary';

function RecentOrders() {
  const dictionaries: DictionaryType[] = [
    {
      id: '1', language: "English", badEntry: "super", rightEntry: "super"
    },
    {
      id: '2', language: "Spanish", badEntry: "hello", rightEntry: "hello"
    },
    {
      id: '3', language: "French", badEntry: "apple", rightEntry: "apple"
    },
    {
      id: '4', language: "German", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '5', language: "Italian", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '6', language: "Portuguese", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '7', language: "Japanese", badEntry: "hello", rightEntry: "hello"
    },
    {
      id: '8', language: "Chinese", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '9', language: "Russian", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '10', language: "Arabic", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '11', language: "Korean", badEntry: "hello", rightEntry: "hello"
    },
    {
      id: '12', language: "Dutch", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '13', language: "Swedish", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '14', language: "Greek", badEntry: "dog", rightEntry: "dog"
    }
  ];

  return (
    <Card>
      <RecentOrdersTable dictionaries={dictionaries} />
    </Card>
  );
}

export default RecentOrders;
