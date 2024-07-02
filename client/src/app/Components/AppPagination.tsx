import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";



interface Props{
    metaData: MetaData;
    onPageChnage: (page: number)=>void;
}


export default function AppPagination({metaData, onPageChnage}:Props) {
    const{currentPage, totalCount, pageSize}=metaData;
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>Displaying {(currentPage-1)*pageSize+1}-{currentPage*pageSize>totalCount ? totalCount: currentPage*pageSize} of {totalCount} items.</Typography>
            <Pagination
                color='secondary'
                size='large'
                count={metaData?.totalPage}
                page={metaData?.currentPage}
                onChange={(e, page)=>onPageChnage(page)}
            />
        </Box>
    )
}