function lerp(A,B,t){
    return A+(B-A)*t;
}
// consider 2 lines A....B , C......D
// for line A...B , there is a variable t , t>=0 && t<=1 // t tells us distance of any point from A on line A...B using lrp function
// similarly u for line C..D

// Ix1 = Ax+(Bx-Ax)t // x cordinate of any point on line AB
// Ix2 = Cx+(Cx-Dx)u // x cordinate of any point on line CD
// for intersection;

// Ix1 == Ix2 && Iy1==Iy2
// sol his eq gives us (t&& u)


function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}
function polysIntersect(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const touch = getIntersection(
                poly1[i],
                poly1[(i + 1) % poly1.length],
                poly2[j],
                poly2[(j + 1) % poly2.length],
            );
            if (touch) {
                return true;
            }
        }
    }
    return false;
}
function polysIntersect(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {  // Incorrect: i++
            const touch = getIntersection(
                poly1[i],
                poly1[(i + 1) % poly1.length],
                poly2[j],
                poly2[(j + 1) % poly2.length],
            );
            if (touch) {
                return true;
            }
        }
    }
    return false;
}

function getRandomColor(){
    const hue=290+Math.random()*260;
    return "hsl("+hue+", 100%, 60%)";
}
 
