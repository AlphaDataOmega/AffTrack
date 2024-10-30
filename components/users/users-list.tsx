"use client";

import { useState } from "react";
import { MoreHorizontal, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditUserDialog } from "./edit-user-dialog";
import { generateMockUsers } from "@/lib/mock-data/users";

interface UsersListProps {
  searchTerm: string;
}

export function UsersList({ searchTerm }: UsersListProps) {
  const [users] = useState(() => generateMockUsers(10));
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500">
            <ShieldAlert className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        );
      case "manager":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
            <Shield className="h-3 w-3 mr-1" />
            Manager
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            <ShieldCheck className="h-3 w-3 mr-1" />
            User
          </Badge>
        );
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={user.active ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.lastLogin}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditUserDialog 
        user={selectedUser} 
        open={!!selectedUser} 
        onOpenChange={(open) => !open && setSelectedUser(null)} 
      />
    </>
  );
}