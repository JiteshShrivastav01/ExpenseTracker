import { useRef, useContext, useEffect , useState} from 'react'
import classes from './Expenses.module.css'
import AuthContext from '../Context/AuthContext'


const AddExpenses=()=>{
    const [expenses,setExpenses]=useState([])
    const ctx=useContext(AuthContext)
    const Name=useRef()
    const Description = useRef()
    const Price=useRef()
    const UserEmail=ctx.email && ctx.email.replace(/[@,.]/g,'')

    const SubmitHandler=async (e)=>{
        e.preventDefault()
        console.log(UserEmail ,'Email')
        const expenseName = Name.current.value
        const expenseDescription = Description.current.value
        const expensePrice = Price.current.value 

        try{
           const res=await fetch(`https://expensetracker-a6562-default-rtdb.firebaseio.com/Users/${UserEmail}/Expenses.json` ,{
            method:'POST',
            body:JSON.stringify({
                ExpenseName : expenseName,
                ExpenseDescription : expenseDescription,
                ExpensePrice : expensePrice
            }),
            headers:{
               'Content-Type' : 'application/json'
            }
           })
           const data = await res.json()
           console.log(data)
        }
        catch(err){
            alert(err)
        }
        Name.current.value=''
        Description.current.value=''
        Price.current.value=''
    }

    useEffect(()=>{
        async function ShowExpenses(){
            try{
               const res=await fetch(`https://expensetracker-a6562-default-rtdb.firebaseio.com/Users/${UserEmail}/Expenses.json`)
               const data=await res.json()
               console.log(data)

               const loader=[]
               for(let key in data){
                loader.push({
                    id : key ,
                    ExpenseName : data[key].ExpenseName,
                    ExpenseDescription : data[key].ExpenseDescription ,
                    ExpensePrice : data[key].ExpensePrice
                })
               }
               setExpenses(loader)
            }
            catch(err){
                alert(err)
            }
        }
        ShowExpenses()
    },[UserEmail,SubmitHandler])


    return(
      <div>
        <div className={classes.container}>
         <form className={classes.form} onSubmit={SubmitHandler}>
            <select name="Expenses" className={classes.select} placeholder='Select Expense' ref={Name}>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Hotel">Hotel</option>
            </select>
            <input type="number" placeholder='Price' ref={Description} className={classes.input}/>
            <input type="text" placeholder='Expense Description' ref={Price} className={classes.input}/>
            <button type="submit" className={classes.button}>Add Expenses</button>
         </form>

         <hr />
        </div>
        <hr />
        <div className={classes.showExpenses}>
           <ul>
           {expenses.map(expense=>(
            <li className={classes.list}>{expense.ExpenseName} --- {expense.ExpenseDescription} --- {expense.ExpensePrice}</li>
          ))}
          </ul>
        </div>
      </div>
    )
}

export default AddExpenses