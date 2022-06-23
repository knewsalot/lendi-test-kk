import { Router } from "express";

const appointments = [
  { id: 1, brokerId: 1, date: "15/10/2021" },
  { id: 2, brokerId: 3, date: "22/11/2021" },
  { id: 3, brokerId: 3, date: "23/11/2021" },
  { id: 4, brokerId: 4, date: "10/5/2021" },
  { id: 5, brokerId: 3, date: "10/5/2022" },
];

const router = Router();

export default router;

// ### Task 5: Modify the appointments API to sort by date in a descending order then by broker id in ascending order

router.get("/", (req, res) => {
  // sorts based on DateTime difference between objects, as original date is defined as a string.
  // then sorts based on brokerId in ascending order.
  // descending (b - a), ascending (a - b)
  let apts = appointments

  apts.sort((a, b) => { 
    // re-arrange into something legible for the date type (yyyy-mm-dd)
    let aSplit = a.date.split("/")
    let bSplit = b.date.split("/")
    // convert the parts into strings - and account for Month evaluating from 0 (0 - 11 rather than 1 - 12)
    const aTime = new Date(Number.parseInt(aSplit[2]), Number.parseInt(aSplit[1])-1, Number.parseInt(aSplit[0]))
    const bTime = new Date(Number.parseInt(bSplit[2]), Number.parseInt(bSplit[1])-1, Number.parseInt(bSplit[0]))
    return bTime.getTime() - aTime.getTime()
  }).sort((a, b) => {
    return a.brokerId - b.brokerId
  })

  res.send(apts);
});
