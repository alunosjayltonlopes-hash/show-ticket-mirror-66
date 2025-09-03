import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Clock, LogOut, ArrowLeft } from 'lucide-react';

interface UserTicket {
  id: string;
  ticket_section: string;
  ticket_price: string;
  ticket_zone: string;
  quantity: number;
  status: string;
  purchase_date: string;
}

const Dashboard = () => {
  const { user, signOut, isLocal } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Fetch user tickets
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;

      if (isLocal) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTickets(data);
      }
      setLoading(false);
    };

    fetchTickets();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Processando';
      case 'confirmed':
        return 'Confirmado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-xl font-bold">Meus Ingressos</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-6">
          {/* Welcome Card */}
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo ao seu painel!</CardTitle>
              <CardDescription>
                Aqui você pode acompanhar todos os seus ingressos e o status das suas compras.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Tickets */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Seus Ingressos</h2>
            
            {loading ? (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">Carregando ingressos...</p>
                </CardContent>
              </Card>
            ) : tickets.length === 0 ? (
              isLocal ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center">
                      <p className="mb-2 font-medium">Seus ingressos estão sendo processados</p>
                      <p className="text-muted-foreground text-sm">Assim que o pagamento for confirmado no checkout, eles aparecerão aqui.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">Você ainda não possui ingressos.</p>
                      <Button onClick={() => navigate('/')}>Comprar Ingressos</Button>
                    </div>
                  </CardContent>
                </Card>
              )
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{ticket.ticket_section}</h3>
                            <Badge variant="outline">{ticket.ticket_zone}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Quantidade: {ticket.quantity}</span>
                            <span>•</span>
                            <span>Preço: {ticket.ticket_price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              Comprado em {new Date(ticket.purchase_date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                            {getStatusText(ticket.status)}
                          </Badge>
                          {ticket.status === 'processing' && (
                            <p className="text-xs text-muted-foreground text-right">
                              Seus ingressos estão sendo processados
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;