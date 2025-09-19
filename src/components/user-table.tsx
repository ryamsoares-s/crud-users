"use client";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Edit, Trash2, Mail, UserIcon } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
}

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
}: UserTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-muted/20 rounded-lg animate-pulse"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-muted rounded" />
                <div className="w-48 h-3 bg-muted rounded" />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-16 h-8 bg-muted rounded" />
              <div className="w-16 h-8 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <UserIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Nenhum usuário encontrado
        </h3>
        <p className="text-muted-foreground">
          Comece criando seu primeiro usuário.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-foreground">{user.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  ID: {user.id}
                </Badge>
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Mail className="w-3 h-3" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user)}
              className="border-border hover:bg-accent"
            >
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(user.id)}
              className="border-destructive/20 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Deletar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
