import { Card } from '@mui/material';
import { BlogType } from 'src/models/blog';
import SourceBlogsTable from './SourceBlogsTable';
import { subDays } from 'date-fns';

function SourceBlogs() {
  const blogs: BlogType[] = [
    {
      id: '#0012451',
      date: '04/08/2020 12:34 AM',
      slug: "IA Project with NLP function",
      status: 'publish',
      title: "Medan, Indonesia",
      number: 1,
      content: ""
    },
    {
      "id": "#0012452",
      "date": "05/08/2020 09:15 AM",
      "slug": "AI Project with Image Recognition",
      "status": "publish",
      "title": "Jakarta, Indonesia",
      "number": 2,
      content: ""
    },
    {
      "id": "#0012453",
      "date": "06/08/2020 03:45 PM",
      "slug": "ML Project for Data Analysis",
      "status": "publish",
      "title": "Bandung, Indonesia",
      "number": 3,
      content: ""
    },
    {
      "id": "#0012454",
      "date": "07/08/2020 10:20 AM",
      "slug": "AI Project with Speech Recognition",
      "status": "publish",
      "title": "Surabaya, Indonesia",
      "number": 4,
      content: ""
    },
    {
      "id": "#0012455",
      "date": "08/08/2020 04:55 PM",
      "slug": "NLP Project for Sentiment Analysis",
      "status": "publish",
      "title": "Yogyakarta, Indonesia",
      "number": 5,
      content: ""
    },
    {
      "id": "#0012456",
      "date": "09/08/2020 11:30 AM",
      "slug": "AI Project for Recommendation System",
      "status": "publish",
      "title": "Semarang, Indonesia",
      "number": 6,
      content: ""
    },
    {
      "id": "#0012457",
      "date": "10/08/2020 06:05 PM",
      "slug": "ML Project with Time Series Analysis",
      "status": "publish",
      "title": "Makassar, Indonesia",
      "number": 7,
      content: ""
    },
    {
      "id": "#0012458",
      "date": "11/08/2020 01:40 PM",
      "slug": "AI Project with Chatbot Development",
      "status": "publish",
      "title": "Palembang, Indonesia",
      "number": 8,
      content: ""
    },
    {
      "id": "#0012459",
      "date": "12/08/2020 07:15 AM",
      "slug": "NLP Project for Named Entity Recognition",
      "status": "publish",
      "title": "Balikpapan, Indonesia",
      "number": 9,
      content: ""
    },
    {
      "id": "#0012460",
      "date": "13/08/2020 02:50 PM",
      "slug": "AI Project for Fraud Detection",
      "status": "publish",
      "title": "Denpasar, Indonesia",
      "number": 10,
      content: ""
    },
    {
      "id": "#0012461",
      "date": "14/08/2020 09:25 AM",
      "slug": "ML Project with Clustering Analysis",
      "status": "publish",
      "title": "Bogor, Indonesia",
      "number": 11,
      content: ""
    }
  ];

  return (
    <Card>
      <SourceBlogsTable />
    </Card>
  );
}

export default SourceBlogs;
