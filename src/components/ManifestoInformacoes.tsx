import { Card } from "./ui/card";
import { Info } from "lucide-react";

const ManifestoInformacoes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold">INFORMAÇÕES</h2>
        </div>

        <div className="prose max-w-none">
          <h3 className="text-xl font-bold mb-4">Manifesto Musical da Mantiqueira chega ao Maracanã</h3>
          
          <p className="mb-4">
            Conforme as Resoluções nº 9600 das, 9600 de 28 de julho de 2023, Resolução 9 e outros decretos que dispõem em alguns tópicos das
            resoluções (vide sobre este assunto consultar vista dos autos Processo). A dupla está bem
            feliz com as possibilidades que além do dia 3 de Janeiro, ao lado dos amigos, de alguns
            amigos, nós vão contar com um show exclusivo do DJ Petinho das Amadas.
          </p>

          <p className="mb-4">
            Esta será a volta sonhada do dia de som de dupla ao Rio de Janeiro, de realização de Henrique & Juliano, e
            contar com a presença do público carioca. O melhor convidado para todas as idades, com amigos de
            festa do DJ Petinho das Amadas.
          </p>

          <div className="bg-muted p-4 rounded-lg mt-6">
            <h4 className="font-bold mb-2">Dados Principais:</h4>
            <ul className="space-y-2">
              <li><strong>Classificação:</strong> Livre para todos os públicos</li>
              <li><strong>A) Ingresso Permitidos:</strong> De acordo com lei de vendas em solicitadas e que outras seja estabelecido.</li>
              <li><strong>B) Vendas disponíveis:</strong> Por este site e pontos de vendas físicas por todo Brasil.</li>
              <li><strong>C) A venda eletrônica por toda parte carteira:</strong> Meia: mediante lei de vendas oficiais.</li>
            </ul>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg mt-6 border-l-4 border-primary">
            <p className="text-sm">
              <strong>Importante:</strong> O evento será gravado e poderá ser exibido em canais oficiais. 
              Ao adquirir seu ingresso você concorda com os termos e autoriza a utilização de sua imagem.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ManifestoInformacoes;
