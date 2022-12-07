import Box from '@mui/material/Box';
import MUIDataTable, { MUIDataTableOptions }  from "mui-datatables";

 
 const options: MUIDataTableOptions = {
  selectableRows: "none",
  filterType: "checkbox",
};
 
const columns = [
  {
   name: "name",
   label: "Name",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "company",
   label: "Company",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "city",
   label: "City",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "state",
   label: "State",
   options: {
    filter: true,
    sort: false,
   }
  },
 ];
 
 const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
 ];
 
export const EnhancedTable = () => {
  return (
    <Box
      sx={{
        boxShadow: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800', borderRadius: 2,
      }}
    >
      <MUIDataTable
        title={"Users List"}
        data={data}
        columns={columns}
        options={options}
      />          
    </Box>

  );
};
