const Order=require("./assignment1Order");
let totalprice=0;
const PizzaCost=40;
const SubCost=30;
const PastaCost=20;
const DessertCost=15;
const DrinkCost=10;
const ToppingCost=5;

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ITEM:  Symbol("Item"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    DESSERT: Symbol("dessert"),
    REPORT: Symbol("Report")
});

module.exports = class foodorder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "";
        this.sDessert="";
        this.continue="";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                aReturn.push("Welcome to Menu of Indu restaurant.");
                aReturn.push("What item would you like?");
                aReturn.push("Enter 1 for Pizza");
                aReturn.push("Enter 2 for Sub");
                aReturn.push("Enter 3 for Pasta");
                this.stateCur = OrderState.ITEM;
                break;
            case OrderState.ITEM:  
                this.sItem = sInput;
                if(this.sItem==1){
                    this.sItem="PIZZA";
                    totalprice+=PizzaCost;
                }
                else if(this.sItem==2){
                    this.sItem="SUB";
                    totalprice+=SubCost;
                }
                else if(this.sItem==3){
                    this.sItem="PASTA";
                    totalprice+=PastaCost;
                }
                this.stateCur = OrderState.SIZE; 
                aReturn.push(`What size of ${this.sItem} would you like?`);
                aReturn.push("Enter 1 for small,2 for medium,3 for large");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if(this.sSize==1){
                    this.sSize="Small";
                    totalprice+=4;
                }
                else if(this.sSize==2){
                    this.sSize="Medium";
                    totalprice+=6;
                }
                else if(this.sSize==3){
                    this.sSize="Large";
                    totalprice+=8;
                }
                aReturn.push(`What toppings for ${this.sItem} would you like?`);
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DESSERT
                this.sToppings = sInput;
                totalprice+=ToppingCost;
                aReturn.push("Would you like to have dessert with that? press 1 to yes, 0 to no");
                break;

            case OrderState.DESSERT:
                    this.stateCur = OrderState.DRINKS
                    this.sDessert=sInput;
                    aReturn.push("Would you like to have drinks with that? press 1 to yes, 0 to no"); 
                    break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.REPORT
                this.sDrinks=sInput;
                aReturn.push("You ordered:");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks==1){
                    totalprice+=DrinkCost;
                    aReturn.push("Drinks are added");
                }
                if(this.sDessert==1){
                    totalprice+=DessertCost;
                    aReturn.push("Dessert is added")
                }
                aReturn.push(`Total Price : ${totalprice}`);
                aReturn.push("Do you want to continue the order?")
                aReturn.push("Enter 1 to continue, 0 to exit");
                break;
                
                
            case OrderState.REPORT: 
            this.continue=sInput;
            if(this.continue==1){
                this.stateCur = OrderState.ITEM;
                aReturn.push("Enter your next item");
                aReturn.push("What item would you like?");
                aReturn.push("Enter 1 for Pizza");
                aReturn.push("Enter 2 for Sub");
                aReturn.push("Enter 3 for Pasta");
                break;
            }
            else{
        
            aReturn.push("Thanks for ordering at our Restaurant");
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);

                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
            }
        }
        return aReturn;
    }
}