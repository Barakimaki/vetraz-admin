type Props = {
    category: string
    address: string
    paymentTerm: string
}

const Timetable = ({category, address, paymentTerm}:Props) => {
    return (
        <div>
            Расписание
        </div>
    );
};

export default Timetable;