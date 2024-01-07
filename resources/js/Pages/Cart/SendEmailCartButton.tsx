import { Button } from "@/Components/ui/button";
import { Cart } from "@/types";
import { Send } from "lucide-react";
import { useMemo } from "react";

export default function SendEmailCartButton({
    className = "",
    cart,
}: {
    className?: string;
    cart: Cart;
}) {
    const subject = "My Order";
    const products = useMemo(() => {
        return cart.cart_product.map((cart_product) => {
            return `- ${cart_product.product.name} (${cart_product.quantity})`;
        });
    }, [cart]);
    const body =
        "Please send me the following products: \n" + products.join("\n");

    return (
        <a
            href={`mailto:order@test.com?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`}
        >
            <Button variant="outline">
                <Send size={16} className="mr-2" />
                Send Email
            </Button>
        </a>
    );
}
