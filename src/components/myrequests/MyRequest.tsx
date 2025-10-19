import CommonTitle from "@/common/Title";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAllRequests } from "@/store/request/request.thunk";
import { useEffect } from "react";
import { Typography, Box } from "@mui/material";

const MyRequest = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.request.data);
  console.log(data, "MyrequestPage");

  useEffect(() => {
    dispatch(getAllRequests() as any);
  }, [dispatch]);

  return (
    <>
      <CommonTitle
        title="My Requests"
        subTitle="View and track all your submitted requests."
      />

      <Box>
        {data?.data?.map((req: any) => (
          <>
            <Typography>{req.Amount}</Typography>
            <Typography>{req.Fyear}</Typography>
          </>
        ))}
      </Box>
    </>
  );
};

export default MyRequest;
