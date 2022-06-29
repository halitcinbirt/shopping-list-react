import {useState} from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function TodoForm(){
    const [qty, setQty] = useState('');
    const [product, setProduct] = useState('');
    const [lists, setList] = useState([]);

    const handleSubmit = event => {
        event.preventDefault(); // 👈️ prevent page refresh
        if(qty == '' && product == ''){
            alert("Form cannot be left blank");
        }else{
            setList((lists) => [...lists, {  qty: qty, product: product }]);
            document.getElementById("todoForm").reset();
        }
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Shopping List";
        const headers = [["PRODUCT NAME", "QTY"]];

        const data = lists.map(elt=> [elt.product, elt.qty]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("list.pdf")
    }

    const listingItems = lists.map((list) =>
        <tr>
            <td scope="col" className="px-6 py-3">{list.product}</td>
            <td scope="col" className="px-6 py-3">x{list.qty}</td>
        </tr>
    );



    return(
        <div>
            <div className="pl-2 pr-2 grid grid-flow-row-dense lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <form id={"todoForm"} className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <h1 className={'mx-auto mb-5 text-xl font-bold'}>Shopping List Form</h1>
                    <div className="w-full  px-3 mb-12 md:mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-who">
                            PRODUCT NAME
                        </label>
                        <input
                            className="appearance-none block w-full border-black text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-who" onChange={event => setProduct(event.target.value)} type="text" placeholder="What product do you need?" />
                    </div>
                    <div className="w-full  px-3 mb-12 md:mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-first-name">
                            QTY
                        </label>
                        <input
                            className="appearance-none block w-full border-black text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name" onChange={event => setQty(event.target.value)} type="text" placeholder="How many are needed ?" />
                    </div>
                    <div className="w-full  px-3 mb-12 md:mb-0">
                        <button
                            className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-black hover:border-blue-500 rounded">
                            Add To List
                        </button>
                    </div>
                </div>
                </form>
                <div>
                    <h1 className={'text-center mb-5 text-xl font-bold'}>Shopping List</h1>
                    <div className={'relative overflow-x-auto shadow-md sm:rounded-lg"'}>
                        <table className={'w-full text-sm text-left text-gray-500 dark:text-gray-400'}>
                            <thead className={'w-full text-sm text-left text-gray-500 dark:text-gray-400'}>
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    PRODUCT NAME
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    QTY
                                </th>
                            </tr>
                            </thead>
                            <tbody className={'w-full text-sm text-left text-black text-bold dark:text-gray-400'}>
                                 {listingItems}
                            </tbody>
                        </table>
                    </div>
                    {lists.length > 0 &&
                    <button className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-black hover:border-blue-500 rounded mt-2" onClick={() => exportPDF()}>Export</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoForm;